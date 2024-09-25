import { QueryFailedError, Repository } from "typeorm";
import { UserDatasource, UserDto, UserModel } from "../../domain";
import { AppDataSource, Rol, User } from "../../data";
import { BcryptAdapter } from "../security/bcrypt.security";
import { CustomError } from "../errors/custom.error";
import { UserMapper } from "../mappers/user.mapper";

type hashFunction = (password: string) => string;
type compareFunction = (password: string, hashed: string) => boolean;

export class UserDatasourceImpl implements UserDatasource {
  private userRepository: Repository<User>;
  private rolRepository: Repository<Rol>;

  constructor(
    private readonly hashPassword: hashFunction = BcryptAdapter.hash,
    private readonly comparePassword: compareFunction = BcryptAdapter.compare
  ) {
    this.userRepository = AppDataSource.getRepository(User);
    this.rolRepository = AppDataSource.getRepository(Rol);
  }

  /**
   *
   * @param currentUserId
   * @param createUserDto
   * @returns
   */

  async register(
    currentUserId: string,
    createUserDto: UserDto
  ): Promise<UserModel> {
    try {
      const { username, email, password, rolName, userstatus_statusid } =
        createUserDto;

      const targetRole = await this.canCreateUserRole(currentUserId, rolName!);

      const currentUser = await this.userRepository.findOne({
        where: { userid: currentUserId },
        relations: ["rol"],
      });

      if (!currentUser) {
        throw CustomError.badRequest("Current user not found.");
      }

      const isApprovalAutomatic = currentUser.rol.rolName === "Administrador";

      const userCreated = this.userRepository.create({
        username: username,
        email: email,
        password: this.hashPassword(password),
        userApproval: isApprovalAutomatic ? true : false,
        dateApproval: isApprovalAutomatic ? new Date().toISOString() : null,
        rol: { rolid: targetRole.rolid, rolName: targetRole.rolName },
        userStatus: { statusid: userstatus_statusid },
        createdBy: { userid: currentUserId } as User,
      });

      await this.userRepository.save(userCreated);
      return userCreated;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if (err.driverError.code === "23505") {
          throw CustomError.badRequest("A user with this email already exists");
        } else {
          throw CustomError.serverUnavailable(err.message);
        }
      } else if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  private async canCreateUserRole(
    currentUserId: string,
    targetRolName: string
  ): Promise<Rol> {
    const currentUser = await this.userRepository.findOne({
      where: { userid: currentUserId },
      relations: ["rol"],
    });
    if (!currentUser) {
      throw CustomError.badRequest("Current user not found.");
    }

    // Obtén el rol objetivo por su nombre
    const targetRol = await this.rolRepository.findOne({
      where: { rolName: targetRolName },
    });
    if (!targetRol) {
      throw CustomError.badRequest("Target role not found.");
    }

    // Define los roles permitidos para cada rol de usuario
    const allowedRolesForCurrentUser: { [key: string]: string[] } = {
      Administrador: ["Administrador", "Cajero", "Gestor"],
      Gestor: ["Cajero", "Gestor"],
    };

    const userRoleName = currentUser.rol.rolName;
    if (allowedRolesForCurrentUser[userRoleName]) {
      if (
        allowedRolesForCurrentUser[userRoleName].includes(targetRol.rolName)
      ) {
        return targetRol;
      } else {
        throw CustomError.badRequest(
          `You cannot assign the role '${targetRol.rolName}'`
        );
      }
    } else {
      throw CustomError.badRequest(
        `User role '${userRoleName}' does not have permission to assign roles`
      );
    }
  }

  async update(
    userId: string,
    userUpdateDto: UserDto,
    currentUserId: string
  ): Promise<UserModel> {
    try {
      const currentUser = await this.userRepository.findOne({
        where: { userid: currentUserId },
        relations: ["rol"],
      });
      if (!currentUser) {
        throw CustomError.badRequest("Current user not found.");
      }

      if (currentUser.rol.rolName !== "Administrador") {
        throw CustomError.badRequest("Only administrators can update users.");
      }

      const user = await this.userRepository.findOne({
        where: { userid: userId },
        relations: ["rol", "createdBy", "userStatus"],
      });

      if (!user) {
        throw CustomError.badRequest("User does not exist");
      }

      const role = await this.rolRepository.findOne({
        where: { rolName: userUpdateDto.rolName },
      });

      if (!role) {
        throw CustomError.badRequest(
          `Role "${userUpdateDto.rolName}" not found.`
        );
      }
      await this.userRepository.update(
        { userid: userId },
        {
          username: userUpdateDto.username,
          email: userUpdateDto.email,
          password: userUpdateDto.password,
          userStatus: { statusid: userUpdateDto.userstatus_statusid },
          rol: { rolid: role.rolid },
        }
      );

      const updatedUser = await this.userRepository.findOne({
        where: { userid: userId },
        relations: ["rol", "userStatus"],
      });

      if (!updatedUser) {
        throw CustomError.badRequest("User update failed. User not found.");
      }

      return updatedUser;
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  async validator(userId: string, currentUserId: string): Promise<UserModel> {
    try {
      const validatedId = await this.userRepository.findOne({
        where: { userid: userId },
        relations: ["rol"],
      });
      if (!validatedId) {
        throw CustomError.badRequest("The user to be validated does not exist");
      }

      const currentUser = await this.userRepository.findOne({
        where: { userid: currentUserId },
        relations: ["rol"],
      });
      if (!currentUser) {
        throw CustomError.badRequest("Current user not found.");
      }

      if (currentUser.rol.rolName == "Administrador") {
        await this.userRepository.update(
          { userid: userId },
          {
            userApproval: true,
            dateApproval: new Date().toISOString(),
          }
        );
      } else {
        throw CustomError.badRequest(
          `${currentUser.rol.rolName} can't appovid user`
        );
      }
      return validatedId;
    } catch (err) {
      throw CustomError.serverUnavailable();
    }
  }

  async findAll(): Promise<UserModel[]> {
    try {
      const userEntities = await this.userRepository.find({
        relations: ["rol", "userStatus", "createdBy"],
      });

      return UserMapper.getUserEntitiesFromObjects(userEntities);
    } catch (err) {
      throw CustomError.serverUnavailable();
    }
  }

  async delete(currentUserId: string, userId: string): Promise<void> {
    const currentUser = await this.userRepository.findOne({
      where: { userid: currentUserId },
      relations: ["rol"],
    });

    if (!currentUser) {
      throw CustomError.badRequest("Current user not found.");
    }

    if (currentUser.rol.rolName !== "Administrador") {
      throw CustomError.badRequest("Only administrators can delete users.");
    }

    const user = await this.userRepository.findOneBy({
      userid: userId,
    });
    if (!user) {
      throw CustomError.badRequest("Client not exist");
    }

    await this.userRepository.softDelete(userId);
  }

  async findByCredentials(email: string, password: string): Promise<UserModel> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
        relations: ["rol", "userStatus", "createdBy"],
      });

      if (!user) {
        throw CustomError.badRequest("Invalid credentials");
      }

      const isPasswordValid = this.comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw CustomError.badRequest("Invalid credentials");
      }

      return user;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internalServer();
      }
    }
  }
}
