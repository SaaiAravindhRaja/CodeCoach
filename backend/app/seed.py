from .database import SessionLocal
from .models import Problem


PROBLEMS = [
    {
        "title": "Two Sum",
        "slug": "two-sum",
        "difficulty": "easy",
        "description": """Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.

You may assume that each input has exactly one solution, and you may not use the same element twice.

**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9
```

**Example 2:**
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- Only one valid answer exists

**Follow-up:** Can you solve it in O(n) time complexity?""",
        "starter_code": {
            "python": '''def two_sum(nums: list[int], target: int) -> list[int]:
    """
    Find two numbers that add up to target.
    Return their indices.
    """
    # Your code here
    pass''',
            "javascript": '''function twoSum(nums, target) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"nums": [2, 7, 11, 15], "target": 9}, "expected": [0, 1]},
            {"input": {"nums": [3, 2, 4], "target": 6}, "expected": [1, 2]},
            {"input": {"nums": [3, 3], "target": 6}, "expected": [0, 1]}
        ],
        "hints": [
            "Think about what complement you need for each number to reach the target",
            "A hash map can help you look up values in O(1) time",
            "You can store each number's index as you iterate through the array"
        ]
    },
    {
        "title": "Valid Parentheses",
        "slug": "valid-parentheses",
        "difficulty": "easy",
        "description": """Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['`, and `']'`, determine if the input string is valid.

A string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
```
Input: s = "()"
Output: true
```

**Example 2:**
```
Input: s = "()[]{}"
Output: true
```

**Example 3:**
```
Input: s = "(]"
Output: false
```

**Constraints:**
- 1 <= s.length <= 10^4
- s consists of parentheses only: `()[]{}` """,
        "starter_code": {
            "python": '''def is_valid(s: str) -> bool:
    """
    Check if the parentheses string is valid.
    """
    # Your code here
    pass''',
            "javascript": '''function isValid(s) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"s": "()"}, "expected": True},
            {"input": {"s": "()[]{}"}, "expected": True},
            {"input": {"s": "(]"}, "expected": False},
            {"input": {"s": "([)]"}, "expected": False},
            {"input": {"s": "{[]}"}, "expected": True}
        ],
        "hints": [
            "A stack data structure is perfect for matching pairs",
            "Push opening brackets onto the stack",
            "When you see a closing bracket, check if it matches the top of the stack"
        ]
    },
    {
        "title": "Reverse Linked List",
        "slug": "reverse-linked-list",
        "difficulty": "easy",
        "description": """Given the head of a singly linked list, reverse the list and return the reversed list.

**Example 1:**
```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

**Example 2:**
```
Input: head = [1,2]
Output: [2,1]
```

**Example 3:**
```
Input: head = []
Output: []
```

**Constraints:**
- The number of nodes in the list is in the range [0, 5000]
- -5000 <= Node.val <= 5000

**Follow-up:** Can you solve it iteratively AND recursively?""",
        "starter_code": {
            "python": '''class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode) -> ListNode:
    """
    Reverse the linked list.
    Return the new head.
    """
    # Your code here
    pass''',
            "javascript": '''class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function reverseList(head) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"head": [1, 2, 3, 4, 5]}, "expected": [5, 4, 3, 2, 1]},
            {"input": {"head": [1, 2]}, "expected": [2, 1]},
            {"input": {"head": []}, "expected": []}
        ],
        "hints": [
            "You need to change where each node's 'next' pointer points to",
            "Keep track of three nodes: previous, current, and next",
            "For recursive solution, think about what the base case is"
        ]
    },
    {
        "title": "Binary Search",
        "slug": "binary-search",
        "difficulty": "easy",
        "description": """Given a sorted array of integers `nums` and a target value, return the index of `target` if it exists. If not, return -1.

You must write an algorithm with O(log n) runtime complexity.

**Example 1:**
```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums at index 4
```

**Example 2:**
```
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums
```

**Constraints:**
- 1 <= nums.length <= 10^4
- All integers in nums are unique
- nums is sorted in ascending order
- -10^4 < nums[i], target < 10^4""",
        "starter_code": {
            "python": '''def binary_search(nums: list[int], target: int) -> int:
    """
    Search for target in sorted array.
    Return index if found, -1 otherwise.
    """
    # Your code here
    pass''',
            "javascript": '''function binarySearch(nums, target) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"nums": [-1, 0, 3, 5, 9, 12], "target": 9}, "expected": 4},
            {"input": {"nums": [-1, 0, 3, 5, 9, 12], "target": 2}, "expected": -1},
            {"input": {"nums": [5], "target": 5}, "expected": 0}
        ],
        "hints": [
            "Use two pointers: left and right, starting at array boundaries",
            "Calculate middle index and compare with target",
            "If target is smaller, search left half. If larger, search right half"
        ]
    },
    {
        "title": "FizzBuzz",
        "slug": "fizzbuzz",
        "difficulty": "easy",
        "description": """Given an integer `n`, return a string array `answer` (1-indexed) where:

- `answer[i] == "FizzBuzz"` if i is divisible by 3 and 5
- `answer[i] == "Fizz"` if i is divisible by 3
- `answer[i] == "Buzz"` if i is divisible by 5
- `answer[i] == i` (as a string) if none of the above conditions are true

**Example 1:**
```
Input: n = 3
Output: ["1","2","Fizz"]
```

**Example 2:**
```
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
```

**Example 3:**
```
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

**Constraints:**
- 1 <= n <= 10^4

**Follow-up:** Can you solve it without using if-else statements for each condition?""",
        "starter_code": {
            "python": '''def fizz_buzz(n: int) -> list[str]:
    """
    Generate FizzBuzz sequence from 1 to n.
    """
    # Your code here
    pass''',
            "javascript": '''function fizzBuzz(n) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"n": 3}, "expected": ["1", "2", "Fizz"]},
            {"input": {"n": 5}, "expected": ["1", "2", "Fizz", "4", "Buzz"]},
            {"input": {"n": 15}, "expected": ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]}
        ],
        "hints": [
            "Check divisibility by 15 first (3 AND 5), then by 3, then by 5",
            "Use the modulo operator (%) to check divisibility",
            "Consider building the string by concatenating 'Fizz' and 'Buzz' separately"
        ]
    },
    {
        "title": "Merge Two Sorted Lists",
        "slug": "merge-two-sorted-lists",
        "difficulty": "easy",
        "description": """You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Example 1:**
```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

**Example 2:**
```
Input: list1 = [], list2 = []
Output: []
```

**Example 3:**
```
Input: list1 = [], list2 = [0]
Output: [0]
```

**Constraints:**
- The number of nodes in both lists is in the range [0, 50]
- -100 <= Node.val <= 100
- Both list1 and list2 are sorted in non-decreasing order""",
        "starter_code": {
            "python": '''class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(list1: ListNode, list2: ListNode) -> ListNode:
    """
    Merge two sorted linked lists.
    Return the head of the merged list.
    """
    # Your code here
    pass''',
            "javascript": '''class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function mergeTwoLists(list1, list2) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"list1": [1, 2, 4], "list2": [1, 3, 4]}, "expected": [1, 1, 2, 3, 4, 4]},
            {"input": {"list1": [], "list2": []}, "expected": []},
            {"input": {"list1": [], "list2": [0]}, "expected": [0]}
        ],
        "hints": [
            "Use a dummy head node to simplify the merging process",
            "Compare values from both lists and append the smaller one",
            "Don't forget to handle the case when one list is exhausted before the other"
        ]
    },
    {
        "title": "Maximum Subarray",
        "slug": "maximum-subarray",
        "difficulty": "medium",
        "description": """Given an integer array `nums`, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.

**Example 1:**
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

**Example 2:**
```
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
```

**Example 3:**
```
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
```

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

**Follow-up:** Can you solve it using dynamic programming in O(n) time?""",
        "starter_code": {
            "python": '''def max_sub_array(nums: list[int]) -> int:
    """
    Find the contiguous subarray with the largest sum.
    Return the maximum sum.
    """
    # Your code here
    pass''',
            "javascript": '''function maxSubArray(nums) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"nums": [-2, 1, -3, 4, -1, 2, 1, -5, 4]}, "expected": 6},
            {"input": {"nums": [1]}, "expected": 1},
            {"input": {"nums": [5, 4, -1, 7, 8]}, "expected": 23}
        ],
        "hints": [
            "This is a classic dynamic programming problem known as Kadane's algorithm",
            "At each position, decide whether to extend the previous subarray or start a new one",
            "Track both the current sum and the maximum sum seen so far"
        ]
    },
    {
        "title": "3Sum",
        "slug": "three-sum",
        "difficulty": "medium",
        "description": """Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

**Example 1:**
```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0
The distinct triplets are [-1,0,1] and [-1,-1,2].
```

**Example 2:**
```
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
```

**Example 3:**
```
Input: nums = [0,0,0]
Output: [[0,0,0]]
```

**Constraints:**
- 3 <= nums.length <= 3000
- -10^5 <= nums[i] <= 10^5""",
        "starter_code": {
            "python": '''def three_sum(nums: list[int]) -> list[list[int]]:
    """
    Find all unique triplets that sum to zero.
    Return a list of triplets.
    """
    # Your code here
    pass''',
            "javascript": '''function threeSum(nums) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"nums": [-1, 0, 1, 2, -1, -4]}, "expected": [[-1, -1, 2], [-1, 0, 1]]},
            {"input": {"nums": [0, 1, 1]}, "expected": []},
            {"input": {"nums": [0, 0, 0]}, "expected": [[0, 0, 0]]}
        ],
        "hints": [
            "Sort the array first to make it easier to avoid duplicates",
            "Fix one number and use two pointers to find the other two",
            "Skip duplicate values to avoid duplicate triplets in the result"
        ]
    },
    {
        "title": "Longest Palindromic Substring",
        "slug": "longest-palindromic-substring",
        "difficulty": "medium",
        "description": """Given a string `s`, return the longest palindromic substring in `s`.

A palindrome is a string that reads the same forward and backward.

**Example 1:**
```
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

**Example 2:**
```
Input: s = "cbbd"
Output: "bb"
```

**Example 3:**
```
Input: s = "a"
Output: "a"
```

**Constraints:**
- 1 <= s.length <= 1000
- s consists of only digits and English letters""",
        "starter_code": {
            "python": '''def longest_palindrome(s: str) -> str:
    """
    Find the longest palindromic substring.
    Return the palindrome string.
    """
    # Your code here
    pass''',
            "javascript": '''function longestPalindrome(s) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"s": "babad"}, "expected": "bab"},
            {"input": {"s": "cbbd"}, "expected": "bb"},
            {"input": {"s": "a"}, "expected": "a"}
        ],
        "hints": [
            "Expand around center: for each character, try to expand outward",
            "Remember to handle both odd-length and even-length palindromes",
            "Dynamic programming can also solve this: dp[i][j] = true if s[i:j+1] is a palindrome"
        ]
    },
    {
        "title": "Merge Intervals",
        "slug": "merge-intervals",
        "difficulty": "medium",
        "description": """Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Example 1:**
```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

**Example 2:**
```
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

**Constraints:**
- 1 <= intervals.length <= 10^4
- intervals[i].length == 2
- 0 <= start_i <= end_i <= 10^4""",
        "starter_code": {
            "python": '''def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    """
    Merge all overlapping intervals.
    Return the list of merged intervals.
    """
    # Your code here
    pass''',
            "javascript": '''function mergeIntervals(intervals) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"intervals": [[1, 3], [2, 6], [8, 10], [15, 18]]}, "expected": [[1, 6], [8, 10], [15, 18]]},
            {"input": {"intervals": [[1, 4], [4, 5]]}, "expected": [[1, 5]]},
            {"input": {"intervals": [[1, 4], [0, 4]]}, "expected": [[0, 4]]}
        ],
        "hints": [
            "Sort the intervals by their start time first",
            "Iterate through and merge if the current interval overlaps with the previous",
            "Two intervals overlap if the start of one is <= the end of the other"
        ]
    },
    {
        "title": "Word Search",
        "slug": "word-search",
        "difficulty": "hard",
        "description": """Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
```

**Example 2:**
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
```

**Example 3:**
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
```

**Constraints:**
- m == board.length
- n == board[i].length
- 1 <= m, n <= 6
- 1 <= word.length <= 15
- board and word consists of only lowercase and uppercase English letters

**Follow-up:** Could you use search pruning to make your solution faster?""",
        "starter_code": {
            "python": '''def word_search(board: list[list[str]], word: str) -> bool:
    """
    Check if word exists in the grid.
    Return True if found, False otherwise.
    """
    # Your code here
    pass''',
            "javascript": '''function wordSearch(board, word) {
    // Your code here

}'''
        },
        "test_cases": [
            {"input": {"board": [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "word": "ABCCED"}, "expected": True},
            {"input": {"board": [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "word": "SEE"}, "expected": True},
            {"input": {"board": [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "word": "ABCB"}, "expected": False}
        ],
        "hints": [
            "Use backtracking: try each cell as a starting point",
            "Mark visited cells to avoid reusing them in the same path",
            "Explore all four directions (up, down, left, right) recursively"
        ]
    }
]


def seed_problems():
    """Seed the database with initial problems."""
    db = SessionLocal()
    try:
        # Check if problems already exist
        existing = db.query(Problem).first()
        if existing:
            return  # Already seeded

        for problem_data in PROBLEMS:
            problem = Problem(**problem_data)
            db.add(problem)

        db.commit()
        print("Database seeded with 11 problems")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()
