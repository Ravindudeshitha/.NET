using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContext _emp;

        public EmployeeController(EmployeeContext emp)
        {
            _emp = emp;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if(_emp.Employees == null)
            {
                return NotFound();
            }

            return await _emp.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_emp.Employees == null)
            {
                return NotFound();
            }

            var employee = await _emp.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            _emp.Employees.Add(employee);
            await _emp.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmployee(int id, Employee emp)
        {
            if(id != emp.Id)
            {
                return BadRequest();
            }

            _emp.Entry(emp).State = EntityState.Modified;
            try
            {
                await _emp.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            if(_emp.Employees == null)
            {
                return NotFound();
            }

            var employee = await _emp.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound();
            }

            _emp.Employees.Remove(employee);
            await _emp.SaveChangesAsync();

            return Ok();
        }
    }
}
