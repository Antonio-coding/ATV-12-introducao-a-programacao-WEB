// src/app/Components/ClientWrapper/index.tsx
import React from 'react';

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  // Marque o componente como cliente usando useClient
  return React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement<any>, { useClient: true })
  );
};

export default ClientWrapper;
