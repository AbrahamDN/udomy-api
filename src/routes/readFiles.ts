import { Router } from "express";
import directoryTree, {
  DirectoryTree,
  DirectoryTreeCallback,
} from "directory-tree";
import { createHash } from "crypto";

const router = Router();
const folderPath = "../client/public/lessons";

router.get("/", (req, res) => {
  const callback: DirectoryTreeCallback = (
    item: DirectoryTree,
    path: string
  ) => {
    item.name = item.name.replace(/\.[^.]*$/, "");
    item.custom = {
      id: createHash("sha1").update(path).digest("base64"),
      count: item.name.match(/^[^\d]*(\d+)/),
      path: path.match(/(?=lessons).*$/)?.toString(),
    };
  };

  const dirTree: DirectoryTree & { path?: string } = directoryTree(
    folderPath,
    {
      attributes: ["atime", "birthtime", "ctime", "extension", "mtime", "type"],
    },
    callback,
    callback
  );

  res.send(dirTree);
});

export default router;
