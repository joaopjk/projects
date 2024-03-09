using GeekShopping.ProductApi.Data.ValueObjects;

namespace GeekShopping.ProductApi.Repositories;

public interface IProductRepository
{
    Task<IEnumerable<ProductVO>> FindAll();
    Task<ProductVO> FindById(long id);
    Task<ProductVO> Create(ProductVO productVo);
    Task<ProductVO> Update(ProductVO productVo);
    Task<bool> Delete(long id);
}