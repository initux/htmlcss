import Skeleton from "@mui/material/Skeleton";

export default function CardLoading() {
  return (
    <>
      <div className="loader">
        <Skeleton
          variant="rectangular"
          style={{ width: "180px", height: "240px" }}
        />
        <Skeleton width="100%" />
        <Skeleton width="60%" />
      </div>
    </>
  );
}
