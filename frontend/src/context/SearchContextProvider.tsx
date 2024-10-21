import { createContext, Dispatch, SetStateAction, useState, FC, useContext, ReactNode } from "react";

interface SearchContextType {
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
	brands: number[];
	setBrands: Dispatch<SetStateAction<number[]>>;
	country: string;
	setCountry: Dispatch<SetStateAction<string>>;
	rating: number;
	setRating: Dispatch<SetStateAction<number>>;
	features: string[];
	setFeatures: Dispatch<SetStateAction<string[]>>;
	resetFilters: () => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchContextProvider: FC<{ children: ReactNode | ((context: SearchContextType) => ReactNode) }> = ({ children }) => {
	const [search, setSearch] = useState("");
	const [brands, setBrands] = useState<number[]>([]);
	const [country, setCountry] = useState("");
	const [rating, setRating] = useState(5);
	const [features, setFeatures] = useState<string[]>([]);

	const resetFilters = () => {
		setSearch("");
		setBrands([]);
		setCountry("");
		setRating(5);
		setFeatures([]);
	};

	const contextValue = {
		search,
		setSearch,
		brands,
		setBrands,
		country,
		setCountry,
		rating,
		setRating,
		features,
		setFeatures,
		resetFilters,
	};

	return <SearchContext.Provider value={contextValue}>{typeof children === "function" ? children(contextValue) : children}</SearchContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => {
	const context = useContext(SearchContext);

	if (!context) {
		throw new Error("useSearchContext must be used within a SearchProvider");
	}

	return context;
};

export default SearchContextProvider;
