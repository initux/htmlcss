import Skeleton from "@mui/material/Skeleton";

export default function CategoryLoading() {
  return (
    <>
      <div className="loader">
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
      </div>
    </>
  );
}
