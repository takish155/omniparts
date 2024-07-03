const AdminOrderedActionSection = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  return (
    <section className="mb-6">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm">{value}</p>
    </section>
  );
};

export default AdminOrderedActionSection;
