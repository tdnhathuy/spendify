import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useDidUpdate, useInViewRef } from "rooks";

export interface PropsLoadMore
  extends Pick<
    UseInfiniteQueryResult,
    "isFetching" | "isFetchingNextPage" | "hasNextPage" | "fetchNextPage"
  > {}

export const LoaderPaging = (props: PropsLoadMore) => {
  const { isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = props;

  const [myRef, inView] = useInViewRef();

  useDidUpdate(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!hasNextPage) {
    return null;
  }

  if (isFetching || isFetchingNextPage) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  return <div ref={myRef} />;
};
