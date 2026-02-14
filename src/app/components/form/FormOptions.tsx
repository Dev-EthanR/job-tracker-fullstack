const LabelOptions = () => {
  return (
    <>
      <option className="bg-applied text-white" value="APPLIED">
        Applied
      </option>
      <option className="bg-interview text-white" value="INTERVIEW">
        Interview
      </option>
      <option className="bg-offer text-white" value="OFFER">
        Offer
      </option>
      <option className="bg-rejected text-white" value="REJECTED">
        Reject
      </option>
    </>
  );
};

export default LabelOptions;
