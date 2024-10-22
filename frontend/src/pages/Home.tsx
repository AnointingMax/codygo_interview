import { getHotels } from "@/api";
import { EmptyState, Fallback, HotelCard, Search } from "@/components";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchContextProvider, useSearchContext } from "@/context";
import { useQuery } from "@tanstack/react-query";
import { ListFilter } from "lucide-react";

const Home = () => {
	return (
		<SearchContextProvider>
			<div className="grid gap-8 md:grid-cols-[clamp(200px,25vw,270px),1fr]">
				<Search />
				<div>
					<MobileSearch />
					<ListRender />
				</div>
			</div>
		</SearchContextProvider>
	);
};

const ListRender = () => {
	const { search, brands, features, country, rating } = useSearchContext();

	const { data, isLoading } = useQuery({
		queryKey: ["hotels", search, brands, features, country, rating],
		queryFn: () => getHotels({ search, brands, features, country, rating }),
	});

	const hotels = data?.data;

	if (isLoading) return <Fallback />;

	if (!hotels?.length) return <EmptyState />;

	return (
		<div className="grid gap-6 md:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
			{hotels?.map((hotel) => (
				<HotelCard hotel={hotel} key={hotel.id} />
			))}
		</div>
	);
};

const MobileSearch = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full aspect-square md:hidden">
					<ListFilter />
				</Button>
			</SheetTrigger>
			<SheetContent className="pt-12">
				<Search panel />
			</SheetContent>
		</Sheet>
	);
};

export default Home;
