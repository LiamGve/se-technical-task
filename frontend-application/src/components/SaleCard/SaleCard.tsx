import * as React from "react";
import { ISale } from "../../utils/Sale.interface";
import {
  DestinationText,
  SaleCardContent,
  SaleCardLink,
  TitleText,
} from "./SaleCard.styles";
import { FavouriteButton } from "../FavouriteButton/FavouriteButton";

interface ISaleCardProps {
  sale: Partial<ISale>;
}

export const SaleCard: React.FC<ISaleCardProps> = ({ sale }) => {
  return (
    <SaleCardLink to={`/sale/${sale.id}`}>
      <img
        width="100%"
        src={sale.photos?.[0].url}
        alt={sale?.editorial?.title}
      />
      <SaleCardContent>
        <DestinationText>{sale?.editorial?.destinationName}</DestinationText>
        <TitleText>{sale?.editorial?.title}</TitleText>
        <FavouriteButton saleId={sale?.id} />
      </SaleCardContent>
    </SaleCardLink>
  );
};
