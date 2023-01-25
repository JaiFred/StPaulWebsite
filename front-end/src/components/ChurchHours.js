import classNames from "classnames";

const ChurchHours = ({ children, className, before, after }) => (
  <div class={classNames("row", className)}>
    {before}
    <div className="col-12 col-md-4">
      <h2 className="bolder">Church Hours</h2>
      <p>
        Sunday School services:
        <br />
        <strong>9:45 AM.</strong>
      </p>
      <p>
        Sunday Morning services:
        <br />
        <strong>11:00 AM.</strong>
      </p>
      <p>
        Bible Study is every <strong>second</strong> and{" "}
        <strong>third Wednesday</strong> of each month at{" "}
        <strong>7:00 PM.</strong>
      </p>
    </div>
    {after}
  </div>
);

export default ChurchHours;
