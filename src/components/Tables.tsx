import { Masonry } from "@mui/lab";
import { Card } from "@mui/material";
import { SlPeople } from "react-icons/sl";
import { convertToTableTitleFormat, transformData } from "../utils/utils";
import { GroupedOrder, OrdersResponse } from "../types/types";
import { useEffect, useState } from "react";

const Tables = () => {
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://staging.smartendr.be/app/api_get_orders?locations=23,12&timestamp=43399"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: OrdersResponse = await response.json();

        // Group products by table
        if (data.orders) {
          const aggregated = transformData(data.orders);
          setGroupedOrders(aggregated);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Masonry columns={{ xs: 2, sm: 3, lg: 4 }} spacing={2}>
      {groupedOrders.map((group, index) => (
        <Card key={index}>
          <div
            style={{
              backgroundColor: "#E6E6E6",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              position: "relative",
              padding: "5px 0",
              marginBottom: "5px",
            }}
          >
            <SlPeople
              style={{ position: "absolute", left: 0, marginLeft: "10px" }}
            />
            <div style={{ margin: "auto" }}>
              {convertToTableTitleFormat(group.table_name)}
            </div>
          </div>
          <div>
            {group.products.map((product, idx) => (
              <div key={idx} style={{ display: "flex", padding: "1px 0" }}>
                <div style={{ width: "2rem", textAlign: "center" }}>
                  {product.quantity}
                </div>
                <div style={{ marginLeft: "2rem" }}>{product.name}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundColor: group.table_name.startsWith("T-")
                ? "#8DED8D"
                : "#4461E1",
              textAlign: "right",
              padding: "2px 5px",
              marginTop: "5px",
            }}
          >
            min
          </div>
        </Card>
      ))}
    </Masonry>
  );
};

export default Tables;
