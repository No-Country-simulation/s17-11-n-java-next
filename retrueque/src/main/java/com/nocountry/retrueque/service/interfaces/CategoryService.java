package com.nocountry.retrueque.service.interfaces;


import com.nocountry.retrueque.model.dto.request.CategoryReq;
import com.nocountry.retrueque.model.dto.response.CategoryRes;

import java.util.Set;

public interface CategoryService {
  CategoryRes create (CategoryReq user);
  Set<CategoryRes> getAll();
  CategoryRes getById(long id);
  CategoryRes updateById(CategoryReq user, long id);
  String deleteById(long id);
}
