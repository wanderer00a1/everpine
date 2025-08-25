import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import getCabins from "../services/apiCabins";

function Cabins() {
  useEffect(function () {
    //eslint-disable-next-line no-console
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <img src="https://lgmlkbrwgbzvfugwchsn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" />
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
