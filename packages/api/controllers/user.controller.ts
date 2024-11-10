import { updateUserDtoSchema } from "my-website.common/dtos/users/update-user.dto.js";
import {
  UserFindOneQuerySchema,
  UserQuerySchema,
} from "my-website.common/dtos/users/user-query.dto.js";
import { Router } from "express";
import { createUserDtoSchema } from "my-website.common/dtos/users/create-user.dto.js";
import { authorize } from "my-website.common/utils/authorize.js";
import { UserService } from "my-website.services/user.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
const userController = Router();

userController.post("/", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const dto = createUserDtoSchema.parse(req.body);

  const userService = req.scope.resolve<UserService>("UserService");

  const user = await userService.create(dto);
  res.custom({
    code: 200,
    success: true,
    message: "User Created",
    data: user,
  });
});

userController.get("/", async (req, res) => {
  await authorize(() => true);

  const queryDto = UserQuerySchema.parse(req.query);
  const { search, ...commonQueryDto } = queryDto;

  const userService = req.scope.resolve<UserService>("UserService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery, orderByQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(commonQueryDto);

  const searchQuery = search
    ? { fullName: { contains: search, mode: "insensitive" as any } }
    : {};

  const { count, users } = await userService.findAll({
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
});

userController.get("/:id", async (req, res) => {
  await authorize(() => (req?.user ? true : false));
  const id = req.params.id;

  const queryDto = UserFindOneQuerySchema.parse(req.query);

  const userService = req.scope.resolve<UserService>("UserService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const user = await userService.findOne({
    where: { id: +id },
    select: selectQuery,
  });
  return res.custom({
    code: 200,
    success: true,
    data: user,
  });
});

userController.patch("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const id = req.params.id;

  const dto = updateUserDtoSchema.parse(req.body);

  const userService = req.scope.resolve<UserService>("UserService");

  const user = await userService.update(+id, dto);

  return res.custom({
    code: 200,
    success: true,
    message: "User Updated",
    data: user,
  });
});

userController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const id = req.params.id;

  const userService = req.scope.resolve<UserService>("UserService");

  const user = await userService.remove(+id);

  return res.custom({
    code: 200,
    success: true,
    message: "User Deleted",
    data: user,
  });
});

export { userController };
