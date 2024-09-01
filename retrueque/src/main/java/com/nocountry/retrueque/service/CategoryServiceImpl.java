package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.CategoryNotFoundException;
import com.nocountry.retrueque.exception.UserNotFoundException;
import com.nocountry.retrueque.model.dto.request.CategoryReq;
import com.nocountry.retrueque.model.dto.response.CategoryRes;
import com.nocountry.retrueque.model.mapper.CategoryMapper;
import com.nocountry.retrueque.repository.CategoryRepository;
import com.nocountry.retrueque.service.interfaces.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
  private final CategoryRepository categoryRepo;
  private final CategoryMapper categoryMapper;

  @Override
  public CategoryRes create(CategoryReq user) {
    var newCategory = this.categoryMapper.reqToEntity(user);
    var categoryFound = this.categoryRepo.save(newCategory);
    return this.categoryMapper.entityToRes(categoryFound);
  }

  @Override
  public Set<CategoryRes> getAll() {
    var categories = this.categoryRepo.findAll();
    return categories.stream()
            .map(this.categoryMapper::entityToRes)
            .collect(Collectors.toSet());
  }

  @Override
  public CategoryRes getById(long id) {
    var categoryFound = this.categoryRepo.findById(id)
            .orElseThrow(()->new CategoryNotFoundException(id));
    return this.categoryMapper.entityToRes(categoryFound);
  }

  @Override
  public CategoryRes updateById(CategoryReq user, long id) {
    this.verifyIsExist(id);
    var newCategory = this.categoryMapper.reqToEntity(user);
    newCategory.setId(id);
    var categoryFound = this.categoryRepo.save(newCategory);
    return this.categoryMapper.entityToRes(categoryFound);
  }

  @Override
  public String deleteById(long id) {
    this.verifyIsExist(id);
    this.categoryRepo.deleteById(id);
    return "Category deleted successfully, id: "+id;
  }

  private void verifyIsExist(long id){
    boolean isExist = this.categoryRepo.existsById(id);
    if(!isExist) throw new CategoryNotFoundException(id);
  }
}
