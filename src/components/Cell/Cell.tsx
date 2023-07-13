import { CellModel } from "../../models/CellModel";
import classes from './Cell.module.scss';

function Cell({ object }: {object: CellModel}) {
  const isInactiveCellClass = object.isInactiveDate ? classes.date_inactive : "";
  const isCurrentDateClass = object.isCurrentDate ? classes.date_current : "";

  return (
    <div className={classes.cell}>
      <span className={`${classes.date} ${isInactiveCellClass} ${isCurrentDateClass}`}>{object.date}</span>
    </div>
  );
};

export default Cell;