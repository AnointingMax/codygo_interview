import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { useFormikContext } from "formik";
import { removeItemAtIndex } from "@/utils/functions";
import { FileText, Paperclip, X } from "lucide-react";

type Props<CustomFormType> = {
	name: keyof CustomFormType;
	multiple?: boolean;
};

const Dropzone = <CustomFormType,>({ name, multiple = false }: Props<CustomFormType>) => {
	const { setFieldValue, values } = useFormikContext<CustomFormType>();

	const onDrop = useCallback(
		(acceptedFiles) => {
			const files = acceptedFiles?.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
			setFieldValue(name as string, files);
		},
		[name, setFieldValue]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple,
		...(multiple && { maxFiles: 5 }),
		accept: {
			"image/jpeg": [".jpeg", ".jpg"],
			"image/png": [".png"],
		},
	});

	return (
		<div
			className={cn(
				"flex cursor-pointer flex-col items-center gap-4 rounded border border-dashed border-[#CBD5E1] px-4 py-6",
				isDragActive && "bg-gray-100"
			)}
			{...getRootProps()}
		>
			<input {...getInputProps()} aria-label="input-file" />
			{!!(values[name] as any[])?.length && (
				<div className="flex flex-wrap justify-center gap-3">
					{(values[name] as any[])?.map((file, index) => (
						<div
							key={index}
							className="text-bodyText z-50 flex items-center gap-1 rounded-full bg-[#EFEFEF] px-2 py-1 text-xs font-medium"
						>
							<Paperclip className="h-[15px] w-[15px]" />
							{file.name}
							<button
								className="flex items-center justify-center rounded-md p-[0.125rem] hover:bg-red-500 *:hover:text-white"
								type="button"
								onClick={(event) => {
									event.stopPropagation();
									setFieldValue(name as string, removeItemAtIndex(values[name] as any[], index));
								}}
							>
								<X className="h-[12px] w-[12px]" />
							</button>
						</div>
					))}
				</div>
			)}
			<FileText className="h-[30px] w-[30px] text-[#737D8F]" />
			<div className="grid gap-1">
				<p className="max-w-[290px] text-center text-xs font-medium text-[#8F97A5]">
					{multiple
						? "Drag and drop some files here, or click to select files. You can upload a maximum of 5 files"
						: "Drag and drop a file here, or click to select file. You can upload a maximum of 1 file"}
				</p>
				<p className="max-w-[290px] text-center text-xs font-medium text-[#8F97A5]">Only .jpeg, .jpg and png files are allowed</p>
			</div>
			<Button type="button" variant="default">
				Upload file{multiple && "(s)"}
			</Button>
		</div>
	);
};

export default Dropzone;
