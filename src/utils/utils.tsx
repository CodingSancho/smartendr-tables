import { Order, GroupedOrder } from "../types/types";

  
export const transformData = (orders: Order[]): GroupedOrder[] => {
    const groupedByTable: { [key: string]: GroupedOrder } = {};
  
    orders.forEach(order => {
      const { table_name, products } = order;
      const regex = /^T-\d+/;
  
      // Filter out tables with incorrect looking names
      if (!(regex.test(table_name) || table_name === 'DELIVERY' || table_name === 'TAKEAWAY')) {
        return;
      }
  
      if (!groupedByTable[table_name]) {
        groupedByTable[table_name] = {
          table_name,
          products: []
        };
      }
  
      products.forEach(product => { 
        if (product.quantity > 0) {
          const existingProduct = groupedByTable[table_name].products.find(p => p.name === product.name);
  
          if (existingProduct) {
            existingProduct.quantity += product.quantity;
          } else {
            groupedByTable[table_name].products.push({
              name: product.name,
              quantity: product.quantity
            });
          }
        }
      });
    });

    // Filter out tables with no products
    const filteredGroupedOrders = Object.values(groupedByTable).filter(group => group.products.length > 0);

    return Object.values(filteredGroupedOrders);
  };
  
export function convertToTableTitleFormat(input: string): string {
    if (input === "DELIVERY") {
        return "Delivery";
    }
    if (input === "TAKEAWAY") {
        return "Takeaway";
    }

    const match = input.match(/^T-(\d+)$/);
    if (match) {
        return `Indoor, Table ${match[1]}`;
    }

    return input;
}
  
export function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes("ipad")) {
      return "iPad";
    } else if (userAgent.includes("iphone")) {
      return "iPhone";
    } else if (userAgent.includes("android")) {
      return "Android Device";
    } else if (userAgent.includes("windows")) {
      return "Windows PC";
    } else if (userAgent.includes("mac")) {
      return "Mac";
    } else {
      return "Device";
    }
}
