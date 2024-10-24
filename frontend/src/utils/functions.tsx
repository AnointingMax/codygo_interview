import { CircleCheck, CircleX } from "lucide-react";
import { ReactNode } from "react";
import { ExternalToast, toast } from "sonner";

export const setToStorage = (key: string, value: unknown) => {
	const storedValue = JSON.stringify(value);
	localStorage.setItem(key, storedValue);
};

export const getFromStorage = (key: string) => {
	const value = localStorage.getItem(key);
	return value ? JSON.parse(value) : null;
};

export const removeItemAtIndex = (array: any[], indexToRemove: number) => {
	const copy = [...array];

	if (indexToRemove >= 0 && indexToRemove < copy.length) {
		copy.splice(indexToRemove, 1);
	}

	return copy;
};

export const showSuccessToast = (message: string | ReactNode, data?: ExternalToast) =>
	toast.success(message, {
		icon: <CircleCheck className="text-green-500 size-5" />,
		...data,
	});

export const showErrorToast = (message: string | ReactNode, data?: ExternalToast) =>
	toast.error(message, {
		icon: <CircleX className="text-red-500 size-5" />,
		...data,
	});

export const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
	const cleanedObject = {};

	Object.keys(obj).forEach((key) => {
		const value = obj[key];

		// Check if the value is not an empty string, empty array, or null
		if (
			value !== "" &&
			value !== null &&
			!(Array.isArray(value) && value.length === 0)
		) {
			cleanedObject[key] = value;
		}
	});

	return cleanedObject;
}