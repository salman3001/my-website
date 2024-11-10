export class PrismaUtils {
  generateCommonPrismaQuery(dto: {
    select?: string[];
    orderBy?: string;
    skip?: number;
    take?: number;
  }) {
    const { orderBy, select, skip, take } = dto;

    const [orderByKey, orderByDir] = orderBy
      ? orderBy.split(":")
      : [undefined, undefined];

    const orderByQuery =
      orderByKey && orderByDir ? { [orderByKey]: orderByDir } : {};

    let selectQuery = undefined as any;

    if (select) {
      const query = {};
      const _count = { select: {} };
      let anythingToCount = false;

      select.forEach((sel) => {
        if (sel.startsWith("count")) {
          anythingToCount = true;
          const toBeCounted = sel.split(":")[1];
          _count.select[toBeCounted] = true;
        } else {
          query[sel] = true;
        }
      });

      const countQuery = anythingToCount ? { _count } : {};

      selectQuery = { ...query, ...countQuery };
    }

    return {
      skip,
      take,
      orderByQuery,
      selectQuery,
    };
  }
}
