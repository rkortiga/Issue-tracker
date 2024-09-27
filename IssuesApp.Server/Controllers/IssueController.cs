using IssuesApp.Server.Models.Dto;
using IssuesApp.Server.Service;
using Microsoft.AspNetCore.Mvc;

namespace IssuesApp.Server.Controllers
{
	[ApiController]
	[Route("api/issues")]
	public class IssueController : ControllerBase
	{
		private readonly IIssueService _issueService;

		public IssueController(IIssueService issueService)
		{
			_issueService = issueService;
		}

		[HttpGet]
		public async Task<IActionResult> GetIssues()
		{
			var issues = await _issueService.GetAllIssuesAsync();
			if (!issues.Any())
			{
				return NoContent();
			}
			return Ok(issues);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetIssueById(int id)
		{
			var issue = await _issueService.GetIssueByIdAsync(id);
			if (issue == null)
			{
				return NotFound();
			}

			return Ok(issue);
		}

		[HttpPost]
		public async Task<IActionResult> CreateIssue(CreateIssueDto issue)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var newIssue = await _issueService.CreateIssueAsync(issue);
			return CreatedAtAction(nameof(GetIssueById), new { id = newIssue.Id }, newIssue);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateIssue(UpdateIssueDto issue, int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var updatedIssue = await _issueService.UpdateIssueAsync(issue, id);
			if (updatedIssue == null)
			{
				return NotFound();
			}

			return Ok(updatedIssue);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteIssue(int id)
		{
			var deletedIssue = await _issueService.DeleteIssueAsync(id);

			if (!deletedIssue)
			{
				return NotFound();
			}

			return NoContent();
		}
	}
}
