import { useInfiniteQuery } from "@tanstack/react-query";
import { ParamsPagination, ResponsePagination } from "@/lib/types";
import { PropsLoadMore } from "@/lib/components/shared/loader-paging";

interface Params<T> {
  key: string;
  service: (params: ParamsPagination) => Promise<ResponsePagination<T>>;
}

export const usePaging = <T>({ key, service }: Params<T>) => {
  const query = useInfiniteQuery({
    queryKey: [key],
    initialPageParam: { page: 1, limit: 10 },
    queryFn: ({ pageParam }) => service(pageParam),
    getNextPageParam: ({ meta }) => {
      return meta.isLastPage ? undefined : { page: meta.nextPage, limit: 10 };
    },
    select: (data) => ({
      list: data.pages.flatMap((page) => page.data),
      meta: data.pages[data.pages.length - 1].meta,
    }),
    placeholderData: { pageParams: [{ page: 1, limit: 10 }], pages: [] },
  });

  const listData = (query.data?.list ?? []).flat();

  const loaderProps: PropsLoadMore = {
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage ?? false,
    fetchNextPage: query.fetchNextPage,
  };

  return {
    ...query,
    listData,
    loaderProps,
    isFirstLoading: query.isLoading,
  };
};
