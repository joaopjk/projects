using GeekShopping.ProductApi.Data.ValueObjects;
using GeekShopping.ProductApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace GeekShopping.ProductApi.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _repository;

    public ProductsController(IProductRepository repository)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<ProductVO>> GetById(long id)
    {
        var product = await _repository.FindById(id);
        if (product == null) return NotFound();
        return Ok(product);
    }
    
    [HttpGet()]
    public async Task<ActionResult<IEnumerable<ProductVO>>> GetAll()
    {
        var products = await _repository.FindAll();
        if (products == null) return NotFound();
        return Ok(products);
    }

    [HttpPost]
    public async Task<ActionResult<ProductVO>> Create(ProductVO vo)
    {
        if (vo == null) return BadRequest();
        var product = await _repository.Create(vo);
        return Ok(product);
    }
    
    [HttpPut]
    public async Task<ActionResult<ProductVO>> Update(ProductVO vo)
    {
        if (vo == null) return BadRequest();
        var product = await _repository.Update(vo);
        return Ok(product);
    }
    
    [HttpDelete("{id:long}")]
    public async Task<ActionResult<bool>> Delete(long id)
    {
        var status = await _repository.Delete(id);
        if (status == false) return BadRequest();
        return Ok(status);
    }
}