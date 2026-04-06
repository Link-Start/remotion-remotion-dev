export const canUseWebFsWriter = async () => {
  if (!("storage" in navigator)) {
    return false;
  }

  if (!("getDirectory" in navigator.storage)) {
    return false;
  }

  try {
    const directoryHandle = await navigator.storage.getDirectory();
    const fileHandle = await directoryHandle.getFileHandle(
      "remotion-probe-web-fs-support",
      {
        create: true,
      },
    );

    const writable = await fileHandle.createWritable();
    await writable.close();
    return true;
  } catch {
    return false;
  }
};
