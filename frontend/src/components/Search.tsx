import { cn } from "@/lib/utils";
import Input from "./Input";
import Combobox from "./Combobox";
import { COUNTRY_OPTIONS, FEATURES } from "@/lib/constants";
import Slider from "./Slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import CheckBox from "./CheckBox";
import { Button } from "./ui/button";
import { useSearchContext } from "@/context";

type Props = {
	panel?: boolean;
};

const Search = ({ panel }: Props) => {
	const { search, setSearch, brands, setBrands, country, setCountry, rating, setRating, features, setFeatures, resetFilters } = useSearchContext();

	return (
		<div className={cn("gap-2 h-fit", !panel && "hidden md:grid")}>
			<div className="flex items-center justify-between">
				<h2 className="font-semibold ">Search</h2>
				<Button variant="custom" size="sm" className="px-0 text-xs text-red-500" onClick={resetFilters}>
					Reset
				</Button>
			</div>
			<div className="grid gap-4">
				<Input placeholder="Search Hotels..." label="Search" value={search} onChange={({ target }) => setSearch(target.value)} />
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="brands">
						<AccordionTrigger className="text-[0.8rem] font-medium text-black/50 hover:no-underline">Brands</AccordionTrigger>
						<AccordionContent className="grid gap-1 max-h-[200px] overflow-y-auto">
							{FEATURES?.map(({ value, label }) => (
								<CheckBox
									key={value}
									id={value}
									label={label}
									value={value}
									checked={brands.includes(value)}
									onCheckedChange={(checked) => {
										return checked
											? setBrands((prevState) => [...prevState, value])
											: setBrands((prevState) => prevState?.filter((feature) => feature !== value));
									}}
								/>
							))}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<Combobox
					className="w-full"
					placeholder="Select country"
					value={country}
					setValue={setCountry}
					options={COUNTRY_OPTIONS}
					label="Country"
				/>
				<Slider label="Rating" defaultValue={[5]} max={5} step={1} value={[rating]} onValueChange={([value]) => setRating(value)} />
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="features">
						<AccordionTrigger className="text-[0.8rem] font-medium text-black/50 hover:no-underline">Features</AccordionTrigger>
						<AccordionContent className="grid gap-1 max-h-[200px] overflow-y-auto">
							{FEATURES?.map(({ value, label }) => (
								<CheckBox
									key={value}
									id={value}
									label={label}
									value={value}
									checked={features.includes(value)}
									onCheckedChange={(checked) => {
										return checked
											? setFeatures((prevState) => [...prevState, value])
											: setFeatures((prevState) => prevState?.filter((feature) => feature !== value));
									}}
								/>
							))}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default Search;
