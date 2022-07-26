import React, { useEffect, useState } from "react";

export default function Balance({ address }) {
    const [transactions, setTransactions]=useState(null)
  useEffect(() => {
    fetch(
      `https://api.covalenthq.com/v1/42/address/${address}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=ckey_57190a3cdb714746a75e1d39732`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp.data.items);
      });
  }, []);

  return <div></div>;
}
