//Contains API features for searching and filtering
export class ApiFeatures {
  /**
   * Constructs a new queryFunction and Param.
   *
   * @param queryFunction Function which is used to query the Mongodb like find, findById etc.
   * @param queryFunctionParam Every query parameter (After questionMark in URL)
   */
  constructor(queryFunction, queryFunctionParam) {
    this.queryFunction = queryFunction;
    this.queryFunctionParam = queryFunctionParam;
  }

  // Searches for a given keyword.
  search() {
    const keyword = this.queryFunctionParam.keyword
      ? {
          name: {
            $regex: this.queryFunctionParam.keyword,
            $options: "i",
          },
        }
      : {};
    this.queryFunction = this.queryFunction.find(keyword);
    return this;
  }

  // Filters out elements that are not in the filter list.
  filter() {
    //We are making a dict to put in find function of Mongodb to get those ones only
    const filteringTerms = { ...this.queryFunctionParam };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete filteringTerms[key]);
    this.queryFunction = this.queryFunction.find(filteringTerms);
    return this;
  }
}
