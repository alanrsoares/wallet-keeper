import type { FC } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

export type Props = {
  diameter: number;
  address: string;
};

const Identicon: FC<Props> = (props) => (
  <Jazzicon
    diameter={props.diameter}
    seed={jsNumberForAddress(props.address)}
  />
);

export default Identicon;
