namespace IssuesApp.Server.Models.Dto;

public class CreateIssueDto
{
	public string Title { get; set; } = null!;
	
	public string Description { get; set; } = null!;
}