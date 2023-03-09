import classNames from "classnames";
import Image from "next/image";
import style from "./style.module.css";
import React, { useRef, useState, useEffect } from "react";
import { Cancel } from "@material-ui/icons";
import { motion } from "framer-motion";
import {
  showErrorToast,
  showSucessToast,
  showWarnToast,
} from "@/components/lib/customToast";
import { FileExtension } from "@/components/Widgets/FileUpload";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000;

const convertNestedObjectToArray = (nestedObj: { [x: string]: any }) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes: number) =>
  Math.round(bytes / KILO_BYTES_PER_BYTE);
interface files_upload {
  label: string;
  updateFilesCb: (files: File[]) => void;
  fileValues?: File[];
  maxFileSizeInBytes?: number;
  viewType: "small" | "big";
  imageUrls?: string[] | null;
  multiple?: boolean;
  accept: string;
}

const FileUpload = ({
  accept,
  fileValues,
  label,
  multiple,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  updateFilesCb,
  viewType,
  imageUrls,
}: files_upload) => {
  const fileInputField = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState({});
  const [getImageUrls, setImageUrls] = useState<string[]>([]);
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const handleUploadBtnClick = () => {
    fileInputField?.current!.click();
  };

  useEffect(() => {
    if (imageUrls) {
      if (imageUrls.length !== 0) {
        setImageUrls(imageUrls);
      }
    }
  }, [imageUrls]);

  const addNewFiles = (newFiles: any) => {
    for (const file of newFiles) {
      if (
        accept
          .split(",")
          .includes(FileExtension.find((ext) => ext.type === file?.type)?.name!)
      ) {
        if (file.size <= maxFileSizeInBytes) {
          if (!multiple) {
            return { file };
          }
          files[file.name.toLowerCase()] = file;
        } else {
          showErrorToast(`File size too large. file size less than 5mb.`);
        }
      } else {
        showErrorToast(
          `User cannot upload ${
            FileExtension.find((ext) => ext.type === file.type)?.name
          } form here`
        );
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files: { file: any } | { file?: undefined }) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e: { target: { files: any } }) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      const updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const dropHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const { files: newFiles } = e.dataTransfer;

    if (newFiles.length) {
      const updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
      setIsDrag(false);
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDrag(true);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLElement>) => {
    setIsDrag(false);
  };

  const dragEnterHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const removeFile = (fileName: string) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  // use Effect
  useEffect(() => {
    const controller = new AbortController();

    if (!!fileValues && Array.isArray(fileValues) && fileValues.length > 0)
      setFiles(fileValues);
    return () => controller.abort();
  }, [fileValues]);

  return (
    <>
      {viewType === "small" ? (
        <header className="flex flex-col ">
          <input
            className="hidden"
            type="file"
            ref={fileInputField}
            onChange={handleNewFileUpload}
            title=""
            value=""
            accept={accept}
            multiple={multiple}
          />

          <div className="top-0 flex rounded-md">
            <button
              type="button"
              onClick={handleUploadBtnClick}
              id="button"
              className="px-4 py-2 rounded-sm button clay focus:outline-none"
            >
              Upload {multiple ? "files" : "a file"}
            </button>
          </div>
          <h1 className="w-1/5 pt-8 pb-1 mb-4 font-semibold text-gray-900 border-b-2 sm:text-lg border-cyan-600">
            To Upload
          </h1>

          <ul id="gallery" className="flex flex-wrap flex-1 -m-1 ">
            {Object.keys(files).length === 0 && getImageUrls?.length === 0 ? (
              <li className="flex flex-col items-center justify-center w-full h-full text-center">
                <Image
                  className="mx-auto"
                  src="/images/file.png"
                  alt="no data"
                  height={128}
                  width={128}
                />
                <span className="text-gray-500 text-small">
                  No files selected
                </span>
              </li>
            ) : (
              <>
                {Object.keys(getImageUrls).map((fileName, index) => {
                  if (getImageUrls[fileName]?.length > 0) {
                    const isImageFile = getImageUrls[fileName]
                      .split("/")
                      [getImageUrls[fileName].split("/").length - 1].split(".")[
                      getImageUrls[fileName]
                        .split("/")
                        [getImageUrls[fileName].split("/").length - 1].split(
                          "."
                        ).length - 1
                    ];
                    return (
                      <motion.li key={index} className="relative p-3 ">
                        {isImageFile === "xlsx" || isImageFile === "xls" ? (
                          <Image
                            height={100}
                            width={100}
                            src={"/images/csv.png"}
                            alt={`file preview ${index}`}
                          />
                        ) : isImageFile === "pdf" ? (
                          <Image
                            height={100}
                            width={100}
                            src={"/images/pdf.png"}
                            alt={`file preview ${index}`}
                          />
                        ) : isImageFile === "text" ? (
                          <Image
                            height={100}
                            width={100}
                            src={"/images/text.png"}
                            alt={`file preview ${index}`}
                          />
                        ) : (
                          <Image
                            unoptimized
                            height={150}
                            width={200}
                            src={getImageUrls[fileName]}
                            alt={`file preview ${index}`}
                          />
                        )}

                        <div className="flex flex-wrap items-center justify-center h-auto p-3 text-gray-800 bg-rt-backgroundColor ">
                          <div className=" text-cyan-600 w-36">
                            <span className="flex w-32 ">
                              <p className="truncate">
                                {
                                  getImageUrls[fileName].split("/")[
                                    getImageUrls[fileName].split("/").length - 1
                                  ]
                                }
                              </p>
                            </span>
                            <span className="flex font-medium text-green-600">
                              uploaded files
                            </span>
                          </div>
                          {/* <aside className="flex ml-auto ">
                          <Cancel
                            className="ml-auto bg-transparent cursor-pointer fas fa-trash-alt text-rose-600"
                            onClick={() => removeFile(fileName)}
                          />
                        </aside> */}
                        </div>
                      </motion.li>
                    );
                  }
                })}
                {Object.keys(files).map((fileName, index) => {
                  const file = files[fileName];
                  const isImageFile = FileExtension.find(
                    (ext) => ext.type === file.type
                  )?.category;
                  const name = { ...file.name };
                  return (
                    <motion.li key={index} className="relative p-3 ">
                      {isImageFile === "image" ? (
                        <Image
                          height={150}
                          width={200}
                          src={URL.createObjectURL(file)}
                          alt={`file preview ${index}`}
                        />
                      ) : isImageFile === "pdf" ? (
                        <Image
                          height={100}
                          width={100}
                          src={"/images/pdf.png"}
                          alt={`file preview ${index}`}
                        />
                      ) : isImageFile === "text" ? (
                        <Image
                          height={100}
                          width={100}
                          src={"/images/text.png"}
                          alt={`file preview ${index}`}
                        />
                      ) : (
                        <Image
                          height={100}
                          width={100}
                          src={"/images/csv.png"}
                          alt={`file preview ${index}`}
                        />
                      )}
                      {/* <div className="flex flex-wrap items-center justify-center p-3 text-gray-800 bg-rt-backgroundColor">
                        <div className="text-cyan-600">
                          <span className="flex">
                            {name[15] !== undefined
                              ? file.name
                                  .split('.')[0]
                                  .substring(0, 16)
                                  .concat('...')
                              : file.name.split('.')[0]}
                          </span>
                          <span className="flex ">
                            {convertBytesToKB(file.size)} kb
                          </span>
                        </div>
                        <aside className="flex ml-auto ">
                          <Cancel
                            className="ml-auto bg-transparent cursor-pointer fas fa-trash-alt text-rose-600"
                            onClick={() => removeFile(fileName)}
                          />
                        </aside>
                      </div> */}
                      <div className="flex flex-wrap items-center justify-center h-auto p-3 text-gray-800 bg-rt-backgroundColor ">
                        <div className=" text-cyan-600 w-36">
                          <span className="flex w-32 ">
                            <p className="truncate">
                              {name[15] !== undefined
                                ? file.name
                                    .split(".")[0]
                                    .substring(0, 16)
                                    .concat("...")
                                : file.name.split(".")[0]}
                            </p>
                          </span>
                          <span className="flex font-medium text-green-600">
                            {convertBytesToKB(file.size)} kb
                          </span>
                        </div>
                        <aside className="flex ml-auto ">
                          <Cancel
                            className="ml-auto bg-transparent cursor-pointer fas fa-trash-alt text-rose-600"
                            onClick={() => removeFile(fileName)}
                          />
                        </aside>
                      </div>
                    </motion.li>
                  );
                })}
              </>
            )}
          </ul>
        </header>
      ) : (
        <div className="w-full h-full bg-rt-backgroundColor sm:px-8 md:px-16 sm:py-8">
          <main className="container h-full max-w-screen-lg mx-auto">
            <article
              aria-label="File Upload Modal"
              className="relative flex flex-col h-full bg-white rounded-md shadow-xl"
              onDrop={(e) => dropHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnter={(e) => dragEnterHandler(e)}
            >
              <section className="flex flex-col w-full h-full p-8 overflow-auto">
                <header className="flex flex-col items-center justify-center py-12 border-2 border-gray-400 border-dashed">
                  <p className="flex flex-wrap justify-center mb-3 font-semibold text-gray-400">
                    <i>
                      {`Drag and drop your ${
                        multiple ? "files" : " file"
                      } anywhere or`}{" "}
                    </i>
                  </p>
                  <input
                    className="hidden"
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    accept={accept}
                    multiple={multiple}
                  />
                  {isDrag ? (
                    <div
                      className={classNames(
                        `flex flex-col items-center justify-center w-full h-20 rounded-md pointer-events-none`
                      )}
                    >
                      <i>
                        <svg
                          className="w-12 h-12 mb-3 fill-current text-cyan-700"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                        </svg>
                      </i>
                      <p className="text-lg text-cyan-600">
                        {`Drop ${multiple ? "files" : " file"} to upload`}
                      </p>
                    </div>
                  ) : (
                    <div className="top-0 flex flex-col items-center justify-center w-full h-20 rounded-md">
                      <button
                        type="button"
                        onClick={handleUploadBtnClick}
                        id="button"
                        className="px-4 py-2 rounded-sm button clay focus:outline-none"
                      >
                        Upload {multiple ? "files" : "a file"}
                      </button>
                    </div>
                  )}
                </header>

                <h1 className="w-1/5 pt-8 pb-1 mb-4 font-semibold text-gray-900 border-b-2 sm:text-lg border-cyan-600">
                  To Upload
                </h1>

                <ul id="gallery" className="flex flex-wrap flex-1 -m-1 ">
                  {Object.keys(files).length === 0 &&
                  getImageUrls.length === 0 ? (
                    <li className="flex flex-col items-center justify-center w-full h-full text-center">
                      <Image
                        className="mx-auto"
                        src="/images/file.png"
                        alt="no data"
                        height={128}
                        width={128}
                      />
                      <span className="text-gray-500 text-small">
                        No files selected
                      </span>
                    </li>
                  ) : (
                    <>
                      {Object.keys(getImageUrls).map((fileName: any, index) => {
                        if (getImageUrls[fileName] !== "") {
                          const isImageFile = getImageUrls[fileName]
                            .split("/")
                            [
                              getImageUrls[fileName].split("/").length - 1
                            ].split(".")[
                            getImageUrls[fileName]
                              .split("/")
                              [
                                getImageUrls[fileName].split("/").length - 1
                              ].split(".").length - 1
                          ];
                          return (
                            <motion.li key={index} className="relative p-3 ">
                              {isImageFile === "xlsx" ||
                              isImageFile === "xls" ? (
                                <Image
                                  height={100}
                                  width={100}
                                  src={"/images/csv.png"}
                                  alt={`file preview ${index}`}
                                />
                              ) : isImageFile === "pdf" ? (
                                <Image
                                  height={100}
                                  width={100}
                                  src={"/images/pdf.png"}
                                  alt={`file preview ${index}`}
                                />
                              ) : isImageFile === "text" ? (
                                <Image
                                  height={100}
                                  width={100}
                                  src={"/images/text.png"}
                                  alt={`file preview ${index}`}
                                />
                              ) : (
                                <Image
                                  unoptimized
                                  height={150}
                                  width={200}
                                  src={getImageUrls[fileName]}
                                  alt={`file preview ${index}`}
                                />
                              )}

                              <div className="flex flex-wrap items-center justify-center h-auto p-3 text-gray-800 bg-rt-backgroundColor ">
                                <div className=" text-cyan-600 w-36">
                                  <span className="flex w-32 ">
                                    <p className="truncate">
                                      {
                                        getImageUrls[fileName].split("/")[
                                          getImageUrls[fileName].split("/")
                                            .length - 1
                                        ]
                                      }
                                    </p>
                                  </span>
                                  <span className="flex font-medium text-green-600">
                                    uploaded files
                                  </span>
                                </div>
                                {/* <aside className="flex ml-auto ">
                          <Cancel
                            className="ml-auto bg-transparent cursor-pointer fas fa-trash-alt text-rose-600"
                            onClick={() => removeFile(fileName)}
                          />
                        </aside> */}
                              </div>
                            </motion.li>
                          );
                        }
                      })}
                      {Object.keys(files).map((fileName, index) => {
                        const file = files[fileName];
                        const isImageFile = FileExtension.find(
                          (ext) => ext.type === file.type
                        )?.category;
                        const name = { ...file.name };
                        return (
                          <motion.li key={index} className="relative p-3 ">
                            {isImageFile === "image" ? (
                              <Image
                                height={150}
                                width={200}
                                src={URL.createObjectURL(file)}
                                alt={`file preview ${index}`}
                              />
                            ) : isImageFile === "pdf" ? (
                              <Image
                                height={100}
                                width={100}
                                src={"/images/pdf.png"}
                                alt={`file preview ${index}`}
                              />
                            ) : isImageFile === "text" ? (
                              <Image
                                height={100}
                                width={100}
                                src={"/images/text.png"}
                                alt={`file preview ${index}`}
                              />
                            ) : (
                              <Image
                                height={100}
                                width={100}
                                src={"/images/csv.png"}
                                alt={`file preview ${index}`}
                              />
                            )}
                            {/* <div className="flex flex-wrap items-center justify-center p-3 text-gray-800 bg-rt-backgroundColor">
                        <div className="text-cyan-600">
                          <span className="flex">
                            {name[15] !== undefined
                              ? file.name
                                  .split('.')[0]
                                  .substring(0, 16)
                                  .concat('...')
                              : file.name.split('.')[0]}
                          </span>
                          <span className="flex ">
                            {convertBytesToKB(file.size)} kb
                          </span>
                        </div>
                        <aside className="flex ml-auto ">
                          <Cancel
                            className="ml-auto bg-transparent cursor-pointer fas fa-trash-alt text-rose-600"
                            onClick={() => removeFile(fileName)}
                          />
                        </aside>
                      </div> */}
                            <div className="flex flex-wrap items-center justify-center h-auto p-3 text-gray-800 bg-rt-backgroundColor ">
                              <div className=" text-cyan-600 w-36">
                                <span className="flex w-32 ">
                                  <p className="truncate">
                                    {name[15] !== undefined
                                      ? file.name
                                          .split(".")[0]
                                          .substring(0, 16)
                                          .concat("...")
                                      : file.name.split(".")[0]}
                                  </p>
                                </span>
                                <span className="flex font-medium text-green-600">
                                  {convertBytesToKB(file.size)} kb
                                </span>
                              </div>
                              <aside className="flex ml-auto ">
                                <Cancel
                                  className="ml-auto bg-transparent cursor-pointer fas fa-trash-alt text-rose-600"
                                  onClick={() => removeFile(fileName)}
                                />
                              </aside>
                            </div>
                          </motion.li>
                        );
                      })}
                    </>
                    // Object.keys(files).map((fileName, index) => {
                    //   const file = files[fileName]
                    //   const isImageFile = FileExtension.find(
                    //     (ext) => ext.type === file.type
                    //   )?.category
                    //   const name = { ...file.name }
                    //   return (
                    //     <motion.li key={index} className="relative p-3 ">
                    //       {isImageFile === 'image' ? (
                    //         <Image
                    //           height={208}
                    //           width={208}
                    //           src={URL.createObjectURL(file)}
                    //           alt={`file preview ${index}`}
                    //         />
                    //       ) : isImageFile === 'pdf' ? (
                    //         <Image
                    //           height={208}
                    //           width={208}
                    //           src={'/images/pdf.png'}
                    //           alt={`file preview ${index}`}
                    //         />
                    //       ) : isImageFile === 'text' ? (
                    //         <Image
                    //           height={208}
                    //           width={208}
                    //           src={'/images/text.png'}
                    //           alt={`file preview ${index}`}
                    //         />
                    //       ) : (
                    //         <Image
                    //           height={208}
                    //           width={208}
                    //           src={'/images/csv.png'}
                    //           alt={`file preview ${index}`}
                    //         />
                    //       )}
                    //       <div className="flex flex-wrap items-center justify-center p-3 text-gray-800 bg-rt-backgroundColor">
                    //         <div className="text-cyan-600">
                    //           <span className="flex">
                    //             {name[15] !== undefined
                    //               ? file.name
                    //                   .split('.')[0]
                    //                   .substring(0, 16)
                    //                   .concat('...')
                    //               : file.name.split('.')[0]}
                    //           </span>
                    //           <span className="flex ">
                    //             {convertBytesToKB(file.size)} kb
                    //           </span>
                    //         </div>
                    //         <aside className="flex ml-auto ">
                    //           <Cancel
                    //             className="ml-auto bg-transparent cursor-pointer fas fa-trash-alt text-rose-600"
                    //             onClick={() => removeFile(fileName)}
                    //           />
                    //         </aside>
                    //       </div>
                    //     </motion.li>
                    //   )
                    // })
                  )}
                </ul>
              </section>
            </article>
          </main>
        </div>
      )}
    </>
  );
};

export default FileUpload;
