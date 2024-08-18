using IssuesApp.Server.Context;
using IssuesApp.Server.Models;
using IssuesApp.Server.Models.Dto;
using Microsoft.EntityFrameworkCore;

namespace IssuesApp.Server.Service;

public class IssueService : IIssueService
{
	private readonly MyDbContext _context;

	public IssueService(MyDbContext context)
	{
		_context = context;
	}
	
	public async Task<IEnumerable<Issue>> GetAllIssuesAsync()
	{
		return await _context.Issues.ToListAsync();
	}

	public async Task<Issue> GetIssueByIdAsync(int id)
	{
		return await _context.Issues.FindAsync(id);
	}

	public async Task<Issue> CreateIssueAsync(CreateIssueDto issue)
	{
		var newIssue = new Issue
		{
			Title = issue.Title,
			Description = issue.Description,
		};
		
		_context.Issues.Add(newIssue);
		await _context.SaveChangesAsync();
		return newIssue;
	}

	public async Task<Issue> UpdateIssueAsync(UpdateIssueDto issue, int id)
	{
		var issueToUpdate = await _context.Issues.FindAsync(id);
		
		if (issueToUpdate == null)
		{
			return null;
		}
		
		issueToUpdate.Title = issue.Title;
		issueToUpdate.Description = issue.Description;
		
		await _context.SaveChangesAsync();
		return issueToUpdate;
	}

	public async Task<Boolean> DeleteIssueAsync(int id)
	{
		var issueToDelete = await _context.Issues.FindAsync(id);
		
		if (issueToDelete == null)
		{
			return false;
		}
		
		_context.Issues.Remove(issueToDelete);
		await _context.SaveChangesAsync();
		return true;
	}
}