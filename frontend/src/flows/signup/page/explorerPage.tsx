import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  Container,
  CreateButton,
  DirectoryHeader,
  ItemList,
} from "../styles/explorerPage";

interface Item {
  name: string;
  isDirectory: boolean;
}

const apiClient = axios.create({
  baseURL: "http://localhost:3001/main",
  headers: { "Content-Type": "application/json" },
});

interface ItemProps {
  isDirectory: boolean;
  isClickable: boolean;
}

const ItemEntry = styled.li<ItemProps>`
  padding: 8px 12px;
  margin: 4px 0;
  background-color: ${(props) => (props.isDirectory ? "#f0f0f0" : "#fff")};
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};

  &:hover {
    background-color: ${(props) => (props.isClickable ? "#e9e9e9" : "")};
  }
`;

const NoItemsMessage = styled.div`
  color: #777;
  margin-top: 20px;
`;

export const ExplorerPage: React.FC = () => {
  const [currentDirectory, setCurrentDirectory] = useState("/Users");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchDirectoryContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDirectory]);

  const fetchDirectoryContents = async () => {
    try {
      const response = await apiClient.get(
        `/explorer/${encodeURIComponent(currentDirectory)}`
      );
      const data = response.data;
      setItems(data);
    } catch (error) {
      console.error("Error fetching directory contents", error);
    }
  };

  const handleItemClick = (item: Item) => {
    if (item.isDirectory) {
      if (item.name === "..") {
        const parentDirectory = getParentDirectory(currentDirectory);
        setCurrentDirectory(parentDirectory);
      } else {
        const newDirectory = `${currentDirectory}/${item.name}`;
        setCurrentDirectory(newDirectory);
      }
    }
  };

  const getParentDirectory = (path: string) => {
    const normalizedPath = path.replace(/[\\\/]$/, "");
    const lastSlashIndex = normalizedPath.lastIndexOf("/");
    if (lastSlashIndex === -1 || normalizedPath === "/Users") {
      return "/Users";
    }
    return normalizedPath.substring(0, lastSlashIndex);
  };

  const createFolder = async () => {
    const folderName = prompt("Enter new folder name:");
    if (folderName) {
      try {
        await apiClient.post("/explorer", {
          path: currentDirectory,
          folderName: folderName,
        });
        fetchDirectoryContents();
      } catch (error) {
        console.error("Error creating folder", error);
      }
    }
  };

  return (
    <Container>
      <DirectoryHeader>Current Directory: {currentDirectory}</DirectoryHeader>
      <CreateButton onClick={createFolder}>Create New Folder</CreateButton>
      {items.length === 0 && (
        <NoItemsMessage>No items to display</NoItemsMessage>
      )}
      <ItemList>
        {currentDirectory !== "/Users" && (
          <ItemEntry
            onClick={() => handleItemClick({ name: "..", isDirectory: true })}
            isDirectory={true}
            isClickable={true}
          >
            [..]
          </ItemEntry>
        )}
        {items.map((item) => (
          <ItemEntry
            key={item.name}
            onClick={() => handleItemClick(item)}
            isDirectory={item.isDirectory}
            isClickable={item.isDirectory}
          >
            {item.isDirectory ? `[${item.name}]` : item.name}
          </ItemEntry>
        ))}
      </ItemList>
    </Container>
  );
};
