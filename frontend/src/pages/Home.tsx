import { Search } from "@/components";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchContextProvider } from "@/context";
import { ListFilter } from "lucide-react";

const Home = () => {
	return (
		<SearchContextProvider>
			<div className="grid gap-4 md:grid-cols-[clamp(200px,25vw,270px),1fr]">
				<Search />
				<div>
					<MobileSearch />
					<div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"></div>
				</div>
			</div>
		</SearchContextProvider>
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
