//Contains API features for searching and filtering
export class ApiFeatures {
  /**
   * Constructs a new queryFunction and Param.
   *
   * @param queryFunction Function which is used to query the Mongodb like find, findById etc.
   * @param queryFunctionParam Its the keyword to look for in the query like the search keyword or
   * id which will go as parameters for the query function
   */
  constructor(queryFunction, queryFunctionParam) {
    this.queryFunction = queryFunction;
    this.queryFunctionParam = queryFunctionParam;
  }

  // Searches for a given keyword.
  search() {
    const keyword = this.queryFunctionParam
      ? {
          name: {
            $regex: this.queryFunctionParam,
            $options: "i",
          },
        }
      : {};
    this.queryFunction = this.queryFunction.find(keyword);
    return this;
  }
}
