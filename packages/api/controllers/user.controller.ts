import { updateUserDtoSchema } from "my-website.common/dtos/users/update-user.dto.js";
import {
  UserFindOneQuerySchema,
  UserQuerySchema,
} from "my-website.common/dtos/users/user-query.dto.js";
import { createUserDtoSchema } from "my-website.common/dtos/users/create-user.dto.js";
import { UserService } from "my-website.services/user.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class UserController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly userService: UserService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const dto = createUserDtoSchema.parse(req.body);

    const user = await this.userService.create(dto);
    res.custom({
      code: 200,
      success: true,
      message: "User Created",
      data: user,
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = UserQuerySchema.parse(req.query);
    const { search, ...commonQueryDto } = queryDto;

    const { selectQuery, orderByQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search
      ? { fullName: { contains: search, mode: "insensitive" as any } }
      : {};

    const { count, users } = await this.userService.findAll({
      skip,
      take,
      where: { AND: { ...searchQuery } },
      orderBy: orderByQuery,
      select: selectQuery,
    });

    res.custom({
      code: 200,
      success: true,
      data: { count, users },
    });
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    const queryDto = UserFindOneQuerySchema.parse(req.query);

    const { selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const user = await this.userService.findOne({
      where: { id: +id },
      select: selectQuery,
    });
    return res.custom({
      code: 200,
      success: true,
      data: user,
    });
  }

  async findUserPublicProfile(req: Request, res: Response) {
    const userName = req.params.userName;

    const user = await this.userService.getPublicProfile(userName);

    return res.custom({
      code: 200,
      success: true,
      data: user,
    });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;

    const dto = updateUserDtoSchema.parse(req.body);

    const user = await this.userService.update(+id, dto);

    return res.custom({
      code: 200,
      success: true,
      message: "User Updated",
      data: user,
    });
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const user = await this.userService.remove(+id);

    return res.custom({
      code: 200,
      success: true,
      message: "User Deleted",
      data: user,
    });
  }
}
