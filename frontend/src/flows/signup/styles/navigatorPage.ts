import styled from "styled-components";

export const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

export const DirectoryHeader = styled.h2`
  color: #333;
`;

export const CreateButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const ItemList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export const ActionButtons = styled.div`
  display: inline-block;
`;

export const BaseButton = styled.button`
  padding: 4px 8px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: white;

  &:hover {
    opacity: 0.8; /* General hover effect */
  }
`;

// RenameButton with specific styles
export const RenameButton = styled(BaseButton)`
  background-color: #007bff;

  &:hover {
    background-color: #0069d9;
  }
`;

// DeleteButton with specific styles
export const DeleteButton = styled(BaseButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;
export const NoItemsMessage = styled.div`
  color: #777;
  margin-top: 20px;
`;
