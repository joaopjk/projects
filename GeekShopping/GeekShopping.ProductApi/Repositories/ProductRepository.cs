using AutoMapper;
using GeekShopping.ProductApi.Data.ValueObjects;
using GeekShopping.ProductApi.Model;
using GeekShopping.ProductApi.Model.Context;
using Microsoft.EntityFrameworkCore;

namespace GeekShopping.ProductApi.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly IMapper _mapper;
    private readonly MySqlContext _context;

    public ProductRepository(IMapper mapper, MySqlContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<IEnumerable<ProductVO>> FindAll()
    {
        return  _mapper.Map<List<ProductVO>>(await _context.Products.ToListAsync());
    }

    public async Task<ProductVO> FindById(long id)
    {
        return  _mapper.Map<ProductVO>(
            await _context.Products.FirstOrDefaultAsync(x => x.Id == id));
    }

    public async Task<ProductVO> Create(ProductVO productVo)
    {
        var product = _mapper.Map<Product>(productVo);
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return _mapper.Map<ProductVO>(product);
    }

    public async Task<ProductVO> Update(ProductVO productVo)
    {
        var product = _mapper.Map<Product>(productVo);
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
        return _mapper.Map<ProductVO>(product);
    }

    public async Task<bool> Delete(long id)
    {
        try
        {
            var product = await _context.Products.Where(p => p.Id == id).FirstOrDefaultAsync();
            if (product == null) return false;
            
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}