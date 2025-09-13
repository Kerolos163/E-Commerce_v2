const qs = require("qs");

class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    //! Filering
    const queryObj = { ...this.queryString };
    const excludeFilds = ["page", "sort", "limit", "fields", "keyword"];
    excludeFilds.forEach((item) => delete queryObj[item]);

    //? Advanced filtering [gte, gt, lte, lt]
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const filteringQuery = qs.parse(JSON.parse(queryStr));
    this.mongooseQuery = this.mongooseQuery.find(filteringQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if (modelName === "Product") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: "i" } };
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  paginate(countDocuments) {
    const limit = +this.queryString.limit || 10;
    const page = +this.queryString.page || 1;
    const skip = (page - 1) * limit;
    const endIndex = page * limit; //* page number = 2 and limit = 10 then endIndex = 20

    const pagination = {};
    pagination.page = page;
    pagination.limit = limit;
    pagination.totalPages = Math.ceil(countDocuments / limit);

    //? Previous Page
    pagination.Previous = skip > 0 ? page - 1 : page;

    //! Next Page
    pagination.nextPage = endIndex < countDocuments ? page + 1 : page;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
