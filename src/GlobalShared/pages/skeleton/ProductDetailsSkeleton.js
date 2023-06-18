import React from "react";
import Skeleton from "@mui/material/Skeleton";
const ProductDetailsSkeleton = () => {
  return (
    <>
      <div className="p-3">
        <Skeleton
          variant="rectangular"
          style={{ width: "100%", height: "400px" }}
        />
      </div>
      <div className="p-3">
        <Skeleton width="70%" height="45px" />
        <Skeleton width="60%" height="45px" />
        <Skeleton width="50%" height="45px" />
        <Skeleton width="40%" height="45px" />
        <Skeleton width="60%" height="45px" />
        <Skeleton width="50%" height="45px" />
        <Skeleton width="40%" height="45px" />
        <Skeleton width="50%" height="45px" />
      </div>
    </>
  );
};

export default ProductDetailsSkeleton;
