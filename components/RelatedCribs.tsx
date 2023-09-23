import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCribStore } from "../store/authStore";
import { Card } from "../components";
import { Crib } from "../typings";

interface IProps {
  allCribs: Crib[];
}

const RelatedCribs: FC<IProps> = () => {
  let relateParam: any;
  const { allCribs }: any = useCribStore;
  const relate = allCribs.filter((crib: Crib) =>
    crib.form.includes(relateParam)
  );
  return (
    <div>
      <h1>RelatedCribs</h1>
      {/* {relate.length > 0 &&
        relate.map(({ form, caption, description }: Crib) => (
          <Card form={form} caption={caption} description={description} />
        ))} */}
    </div>
  );
};
export default RelatedCribs;
