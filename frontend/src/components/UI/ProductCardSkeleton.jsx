import React from 'react'
import { Skeleton, Box } from '@mui/material';
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image Skeleton */}
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={200} 
        sx={{ bgcolor: 'grey.200' }}
      />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Product Title */}
        <Skeleton 
          variant="text" 
          sx={{ fontSize: '1.1rem', bgcolor: 'grey.200' }} 
        />
        
        {/* Product Description/Category */}
        <Skeleton 
          variant="text" 
          width="70%" 
          sx={{ bgcolor: 'grey.200' }} 
        />
        
        {/* Price Section */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', pt: 1 }}>
          <Skeleton 
            variant="text" 
            width={80} 
            sx={{ bgcolor: 'grey.200' }} 
          />
          <Skeleton 
            variant="text" 
            width={60} 
            sx={{ bgcolor: 'grey.200' }} 
          />
        </Box>
        
        {/* Button Skeleton */}
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={36} 
          sx={{ bgcolor: 'grey.200', borderRadius: 1, mt: 2 }}
        />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
