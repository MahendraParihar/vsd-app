import {JOB_REPOSITORY} from "../../constants/config-constants";
import {TxnJob} from "../../core/database/models/txn-job.model";

export const jobProvider = [
  {
    provide: JOB_REPOSITORY,
    useValue: TxnJob
  }
];
