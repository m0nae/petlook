export default function DistanceInput({ distance, onChange }: any) {
  return (
    <>
      <label htmlFor="miles-filter" className="hidden">
        Distance
      </label>
      <input
        id="miles-filter"
        type="number"
        value={distance}
        className="w-[120px] p-2 rounded-sm mr-3"
        onChange={onChange}
      />
    </>
  );
}
