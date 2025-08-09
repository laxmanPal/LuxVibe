import Title from "../../components/client/Title";
import { useCategoryCtx } from "../../store/CategoryContext";
import { Link } from "react-router-dom";
import FetchingData from "../../components/UI/FetchingData";

const Categories = () => {
  const { categories, fetching } = useCategoryCtx();

  const items = [
    { span: "col-span-2 row-span-2" },
    { span: "col-span-2 row-span-3" },
    { span: "col-span-2 row-span-2" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-2" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-2 row-span-1" },
    { span: "col-span-2 row-span-2" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-1" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <Title
            title="Categories"
            discription="Choose from different Categories"
          />
        </div>

        {fetching ? (
          <div className="flex items-center justify-center py-20">
            <FetchingData title={"Loading Categories..."} />
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[150px] sm:auto-rows-[180px] lg:auto-rows-[200px]">
              {categories.map((category, index) => (
                <Link
                  key={category._id}
                  className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    window.innerWidth >= 640 ? items[index]?.span || "" : ""
                  }`}
                  to={`/category/${category.slug}`}
                >
                  <img
                    src={category.images[0]?.url}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300"></div>
                  
                  {/* Category Name */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="text-center">
                      <h2 className="text-white text-sm sm:text-lg lg:text-xl font-bold uppercase tracking-wide drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                        {category.name}
                      </h2>
                      <div className="w-8 h-0.5 bg-white/80 mx-auto mt-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Hover Effect Accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Categories Found</h3>
            <p className="text-gray-500 text-center max-w-md">We couldn't find any categories at the moment. Please check back later or try refreshing the page.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
