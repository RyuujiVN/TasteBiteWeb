const Purchase = () => {
  const items = [
    {
      key: "",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <>
      <div className="purchase">
        <h3 className="purchase__title">Quản lý đơn hàng</h3>
      </div>
    </>
  );
};

export default Purchase;
