package com.eomcs.mylist.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.eomcs.mylist.dao.BoardDao;
import com.eomcs.mylist.domain.Board;
import com.eomcs.mylist.service.BoardService;

@Service
public class DefaultBoardService implements BoardService {

  @Autowired
  BoardDao boardDao;

  @Transactional
  public int add(Board board) {
    return boardDao.insert(board);
  }

  public List<Board> list() {
    return boardDao.findAll();
  }

  public Board get(int no) {
    Board board = boardDao.findByNo(no);
    if (board != null) {
      boardDao.increaseViewCount(no);
    }
    return board;
  }

  @Transactional
  public int update(Board board) {
    return boardDao.update(board);
  }

  @Transactional
  public int delete(int no) {
    return boardDao.delete(no);
  }
}







