import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as https from 'https';

@Injectable()
export class StudentsService {
  private readonly KINTONE_BASE_URL =
    'https://qmmtawzjw7cs.kintone.com/k/v1/records.json';
  private readonly APP_ID = 8;
  private readonly API_TOKEN = 'PisBx8JPEucIAfAUCxcVPJcEtl1joFN7UEQVpnyQ';

  constructor(
    @InjectRepository(Student)
    private recordRepo: Repository<Student>,
  ) { }

  async getDataFromKintone() {
    try {
      const response = await axios.get(
        `https://qmmtawzjw7cs.kintone.com/k/v1/records.json`,
        {
          headers: {
            'X-Cybozu-API-Token': this.API_TOKEN,
          },
          params: {
            app: this.APP_ID,
            query: '', // có thể bỏ nếu muốn lấy tất cả
          },
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        },
      );
      const records =  response.data.records;
      const students :Student[]= records.map((studentOfArr)=>{
       // console.log(studentOfArr);
        const student = new Student();
        student.maSV = studentOfArr.maSV?.value||'';
        return student;

      })
      const data = await this.recordRepo.create(students);
      try {
        console.log(students[1]);
      
       return await this.recordRepo.save(data);
      } catch (error) {
        throw error;
      }
   


    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Axios Error:', error.response?.status);
        console.error('❌ Axios Response:', JSON.stringify(error.response?.data, null, 2));
      } else {
        console.error('❌ Unknown Error:', error);
      }
    }

  }

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
