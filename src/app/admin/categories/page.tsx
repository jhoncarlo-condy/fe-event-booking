import Header from "@/components/header/header";
import Categories from "./categories";
import Footer from "@/components/footer/footer";

const page = () => {
	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			<Header />
			<Categories />
			<Footer />
		</div>
	);
};

export default page;
